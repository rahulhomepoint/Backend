const Project = require('../../models/Project');
const path = require('path');

// Helper to clean image arrays: if value is [{}] or [null] or [undefined], set to null or []
function cleanImageArray(arr) {
    if (!Array.isArray(arr)) return null;
    // Remove empty objects, null, undefined
    const filtered = arr.filter(img => typeof img === 'string' && img.trim() !== '');
    return filtered.length > 0 ? filtered : null;
}

// Helper to map uploaded files to the correct nested fields in the project object
function mapImagesToProjectData(body, files) {
    // Parse JSON fields if they are stringified (from multipart/form-data)
    let data = { ...body };
    // Parse nested objects/arrays if needed
    const parseIfString = (field) => {
        if (typeof field === 'string') {
            try { return JSON.parse(field); } catch { return field; }
        }
        return field;
    };
    data.project_info = parseIfString(data.project_info)
    data.hero = parseIfString(data.hero);
    data.overview = parseIfString(data.overview);
    data.amenities = parseIfString(data.amenities);
    data.highlights = parseIfString(data.highlights);
    data.zones = parseIfString(data.zones);
    data.location_advantage = parseIfString(data.location_advantage);
    data.layout_and_floorplan = parseIfString(data.layout_and_floorplan);
    data.about = parseIfString(data.about);

    // --- Merge project_logo arrays if present ---
    if (data.project_info) {
        let logos = [];
        // Accept both project_logo and projectLogo for flexibility
        if (Array.isArray(data.project_info.project_logo)) {
            logos = logos.concat(data.project_info.project_logo);
        } else if (typeof data.project_info.project_logo === 'string') {
            logos.push(data.project_info.project_logo);
        }
        // If project_logo is sent at root level (not inside project_info)
        if (Array.isArray(data.project_logo)) {
            logos = logos.concat(data.project_logo);
        } else if (typeof data.project_logo === 'string') {
            logos.push(data.project_logo);
        }
        // Remove duplicates
        logos = Array.from(new Set(logos.filter(l => typeof l === 'string' && l.trim() !== '')));
        data.project_info.project_logo = logos;
        // Map project_info to project for schema compatibility
        data.project = data.project_info;
        delete data.project_info;
    }

    if (files && Array.isArray(files)) {
        // hero.hero_images
        const heroImages = files.filter(f => f.fieldname === 'hero.hero_images');
        if (!data.hero) data.hero = {};
        data.hero.hero_images = heroImages.length > 0 ? heroImages.map(f => f.path.replace(/\\/g, '/')) : null;
        // overview.overview_gallery_images
        const overviewGallery = files.filter(f => f.fieldname === 'overview.overview_gallery_images');
        if (!data.overview) data.overview = {};
        data.overview.overview_gallery_images = overviewGallery.length > 0 ? overviewGallery.map(f => f.path.replace(/\\/g, '/')) : null;
        // highlights[].image
        if (Array.isArray(data.highlights)) {
            data.highlights.forEach((highlight, idx) => {
                const highlightImages = files.filter(f => f.fieldname === `highlights[${idx}].image`);
                highlight.image = highlightImages.length > 0 ? highlightImages.map(f => f.path.replace(/\\/g, '/')) : null;
            });
        }
        // zones[].image
        if (Array.isArray(data.zones)) {
            data.zones.forEach((zone, idx) => {
                const zoneImages = files.filter(f => f.fieldname === `zones[${idx}].image`);
                zone.image = zoneImages.length > 0 ? zoneImages.map(f => f.path.replace(/\\/g, '/')) : null;
            });
        }
        // layout_and_floorplan.layouts[].image
        if (data.layout_and_floorplan && Array.isArray(data.layout_and_floorplan.layouts)) {
            data.layout_and_floorplan.layouts.forEach((layout, idx) => {
                const layoutImages = files.filter(f => f.fieldname === `layout_and_floorplan.layouts[${idx}].image`);
                layout.image = layoutImages.length > 0 ? layoutImages.map(f => f.path.replace(/\\/g, '/')) : null;
            });
        }
        // about.left_image
        const aboutLeftImages = files.filter(f => f.fieldname === 'about.left_image');
        if (!data.about) data.about = {};
        data.about.left_image = aboutLeftImages.length > 0 ? aboutLeftImages.map(f => f.path.replace(/\\/g, '/')) : null;
    }

    // Clean up image fields if they are [{}] or invalid
    if (data.hero && Array.isArray(data.hero.hero_images)) {
        data.hero.hero_images = cleanImageArray(data.hero.hero_images);
    }
    if (data.overview && Array.isArray(data.overview.overview_gallery_images)) {
        data.overview.overview_gallery_images = cleanImageArray(data.overview.overview_gallery_images);
    }
    if (Array.isArray(data.highlights)) {
        data.highlights.forEach(h => {
            if (Array.isArray(h.image)) h.image = cleanImageArray(h.image);
        });
    }
    if (Array.isArray(data.zones)) {
        data.zones.forEach(z => {
            if (Array.isArray(z.image)) z.image = cleanImageArray(z.image);
        });
    }
    if (data.layout_and_floorplan && Array.isArray(data.layout_and_floorplan.layouts)) {
        data.layout_and_floorplan.layouts.forEach(l => {
            if (Array.isArray(l.image)) l.image = cleanImageArray(l.image);
        });
    }
    if (data.about && Array.isArray(data.about.left_image)) {
        data.about.left_image = cleanImageArray(data.about.left_image);
    }

    return data;
}

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const data = mapImagesToProjectData(req.body, req.files);
        const project = new Project(data);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single project by ID
exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// List all projects
exports.listProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
    try {
        const data = mapImagesToProjectData(req.body, req.files);
        const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get the count of all projects
exports.countProjects = async (req, res) => {
    try {
        const count = await Project.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}; 