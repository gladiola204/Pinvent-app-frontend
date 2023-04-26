import { useState } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from 'react-router-dom';

interface TypeItem {
    title: string,
    icon: JSX.Element,
    path?: string,
    childrens?: {
          title: string,
          path: string,
        }[],
}

const activeLink = ({ isActive }: {isActive: boolean}) => (isActive? "active" : "link");
const activeSubLink = ({ isActive }: {isActive: boolean}) => (isActive? "active" : "link");

function SidebarItem({item, isOpen}: {item: TypeItem, isOpen: boolean}) {
    const [expandMenu, setExpandMenu] = useState(false);

    const toggleExpandMenu = () => setExpandMenu(!expandMenu);

    if (item.childrens) {
        const itemChildren = item.childrens.map((child, index) => {
            return (
                <div key={index} className="s-child">
                    <NavLink to={child.path} className={activeSubLink}>
                        <div className="sidebar-item">
                            <div className="sidebar-title">
                                {isOpen && <div>{child.title}</div>}
                            </div>
                        </div>
                    </NavLink>
                </div>
            )
        });

        return (  
            <div className={expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"}>
                <div className="sidebar-title">
                    <span>
                        {item.icon && <div className='icon'>{item.icon}</div>}
                        {isOpen && <div>{item.title}</div>}
                    </span>
                    <MdKeyboardArrowRight size={25} className='arrow-icon' onClick={toggleExpandMenu}/>
                </div>

                <div className="sidebar-content">
                    {itemChildren}
                </div>
            </div>
        );

    } else if(!item.path) {
        return <div>Not found</div>
    } else {
        return (
            <NavLink to={item.path} className={activeLink}>
                <div className="sidebar-item s-parent">
                    <div className="sidebar-title">
                        <span>
                            {item.icon && <div className='icon'>{item.icon}</div>}
                            {isOpen && <div>{item.title}</div>}
                        </span>
                    </div>
                </div>
            </NavLink>
        );
    }
    
}

export default SidebarItem;