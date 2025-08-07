'use client';

import projectsData from '../data/projects.json'
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import Search from '../components/Search';
import Header from '../components/Header';

export default function Projects() {
    const projects: Project[] = projectsData;

    return (
		<>	
			<Header is_front_page={false} />
			<main className="overflow-hidden mx-auto p-14 pb-0">
				<h1 className="text-6xl text-right font-bold mt-14">PROJECTS</h1>
				<div className='grid grid-cols-[1.5fr_3fr] border-t border-border mt-5'>

					{/* Search */}
					<div className='border border-l-0 border-r-border border-t-0 border-b-0'>
						<Search 
							cards={projects}
							type='projects'
							quote={<p>"Every engineer has his 10 years in the sun." - <span className="italic">Giovanni Battista Caproni</span></p>}
						/>
					</div>

					{/* Projects */}
					<div className="grid grid-cols-1">
						{[...projects].reverse().map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				</div>
			</main>
		</>
    );
}