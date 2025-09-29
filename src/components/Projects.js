import React, { useState } from 'react'
import data from '../data/data.json'


const getProjectCategories = (projects) => {
    // Use techStack or projectType for categories. Here, using projectType for simplicity.
    const categories = Array.from(new Set(projects.map(p => p.projectType)));
    return categories;
}

const Projects = () => {
    const { projects } = data.data;
    const iconpath = "/images/icons/";
    const imgpath = "/images/projects/";
    const open = '/images/icons/open.png';
    const githubgrey = '/images/icons/github-grey.png';

    // Get unique categories from projectType
    const categories = getProjectCategories(projects);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    // Filter projects by selected category
    const filteredProjects = projects.filter(p => p.projectType === selectedCategory);

    return (
        <section className="px-2" id="projects">
            <div className="container project-div">
                <div className="title">
                    <p>Projects</p>
                </div>
                {/* Tab Buttons */}
                <div className="project-tabs mb-4 d-flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`tab-btn${selectedCategory === cat ? ' active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                            <span className="tab-underline" />
                        </button>
                    ))}
                </div>
                <div className="project">
                    {filteredProjects.length === 0 ? (
                        <p>No projects found for this category.</p>
                    ) : (
                        filteredProjects.map((project, index) => (
                            <div className="card" key={project.projectName + index}>
                                <div className={index % 2 === 0 ? "row g-0 card-row" : "row g-0 card-row flex-row-reverse"}>
                                    <div className="col-lg-5">
                                        {project.projectImage.length > 1 ? (
                                            <div
                                                id={"project" + index}
                                                className="carousel slide"
                                                data-bs-ride="carousel"
                                            >
                                                <div className="carousel-inner">
                                                    {project.projectImage.map((image, id) => (
                                                        <div className={id === 0 ? "carousel-item active" : "carousel-item"} key={image + id}>
                                                            <img src={imgpath + image} className="d-block w-100 rounded-start rounded-end" alt={`${project.projectName} - Project Demo`} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    className="carousel-control-prev"
                                                    type="button"
                                                    data-bs-target={"#project" + index}
                                                    data-bs-slide="prev"
                                                >
                                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button
                                                    className="carousel-control-next"
                                                    type="button"
                                                    data-bs-target={"#project" + index}
                                                    data-bs-slide="next"
                                                >
                                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <img src={imgpath + project.projectImage[0]} className="img-fluid rounded-start rounded-end" alt={`${project.projectName} - Project Demo`} />
                                        )}
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="card-body">
                                            <h5 className="card-title">{project.projectType}</h5>
                                            <h3 className="card-main-title">{project.projectName}</h3>
                                            <div className="tech">
                                                {project.techStack.map((item, idx) => (
                                                    <span className="tech-item" key={item.name + idx}>
                                                        <img src={iconpath + item.image + ".png"} className="skill-icon me-2" alt={`${item.name} - Project Skill Icon`} />
                                                        <span className="tooltip">{item.name}</span>
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="card-text">{project.description}</p>
                                            {project.githubLink.length > 1 ? (
                                                <a href={project.githubLink} target="_blank" rel="noreferrer" type="button" className="btn btn-lg skill-btn me-2">
                                                    <img src={githubgrey} className="skill-icon mx-2" alt='Github Icon' /> <span className="me-2">Source</span>
                                                </a>
                                            ) : null}
                                            {project.liveLink.length > 1 ? (
                                                <a href={project.liveLink} target="_blank" rel="noreferrer" type="button" className="btn btn-lg skill-btn">
                                                    <img src={open} className="skill-icon mx-2" alt='Project Live Icon' /> <span className="me-2">Live</span>
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default Projects;
