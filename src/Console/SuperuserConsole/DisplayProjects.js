import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';


function DisplayProjects({ displayProjects_refresh_count,  refreshDisplayProjects}){
    const [isVisible, setIsVisible] = useState(true);
    const [projectsData, setProjectsData] = useState({});

    const ChangeVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        const DispleyProjectsList = async () => {
            try {
                const response = await API.get('OurApiAmplifyProject', '/GetProjectsListFromDB');
                
                const response_data = Object.values(response).map(str => JSON.parse(str));
                setProjectsData(response_data);

                console.log(response);
                console.log(response_data);
                

            }catch(error) {
                console.error(error);
                console.log('Cannot display projects');
            }
        };
        
        DispleyProjectsList();
    }, [displayProjects_refresh_count]);



    return(
        <div id='DisplayProjectsConsole' className = 'console_element'>
            <div className='console_element_header'>
                <h3>Projects Display</h3>
                <div className='console_element_header_buttons'>
                    <button onClick={refreshDisplayProjects}>Refresh</button>
                    <button onClick={ChangeVisibility}>{isVisible ? 'Hide Projects' : 'Show Projects'}</button>
                </div>
            </div>
            <div>
                <div id = "display_projects_resoult" style={{ display: isVisible ? 'block' : 'none' }}>
                    
                    <table>
                        <tr>
                            <th>Project Name</th>
                            <th>Tech User Email</th>
                        </tr>
                        {Object.keys(projectsData).map((key) => (
                            <tr key={key}>
                                <td>{projectsData[key].project_name}</td> 
                                <td>{projectsData[key].tech_user_email}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DisplayProjects;