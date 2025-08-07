import projectsData from '@/app/data/projects.json'
import { Project } from '@/app/types'
import ProjectCard from '@/app/components/ProjectCard'
import { sanitize_to_slug } from '@/utils/utils'
import Search from '@/app/components/Search'
import Header from '@/app/components/Header'

interface ProjectFilterPageProps {
    params: {
        filter_type: string;
        filter_value: string;
    }
}

export default async function ProjectsFiltered({ params }: ProjectFilterPageProps) {
    const { filter_type, filter_value } = await params; // await to silence an error
    const projects: Project[] = projectsData;

    const filteredProjects = projects.filter(project => {
        const sanitized_value = sanitize_to_slug(filter_value.toString());

        if (filter_type == 'tags') {
            return project.tags.some(tag => sanitize_to_slug(tag) === sanitized_value)
        }

        if (filter_type == 'year') {
            return sanitize_to_slug(project.year.toString()) === sanitized_value;
        }

        return false
    });

    return (
        <>
            <Header is_front_page={false} />
            <main className="mx-auto p-14 pb-0">
                <h1 className="text-6xl text-right font-bold mt-14">PROJECTS</h1>
                <div className='grid grid-cols-[1.5fr_3fr] border-t border-border mt-5'>

                    {/* Search */}
                    <div className='border border-l-0 border-r-border border-t-0 border-b-0'>
                        <Search 
                            cards={projects}
                            type='projects'
                            quote={<p>&quot;Every engineer has his 10 years in the sun.&quot; - <span className="italic">Giovanni Battista Caproni</span></p>}
                            />
                    </div>

                    {/* Projects */}
                    <div className="grid grid-cols-1">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        ) : (
                            <p>No projects found for this filter.</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}