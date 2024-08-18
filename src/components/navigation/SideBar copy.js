export const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-archive"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Kombe Farms Reports</div>
            </a>
            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />
            
            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/* <!-- Heading --> */}
            <div className="sidebar-heading">
               Reports
            </div>
            
            
            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#/" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-fish"></i>
                    <span>Fish Farm</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Fish Farming Reports:</h6>
                        <a className="collapse-item" href="/ponds">Ponds</a>
                        <a className="collapse-item" href="stocks">Fish Stock</a>
                        
                        
                    </div>
                </div>
            </li>
             {/* <!-- Nav Item - Pages Collapse Menu --> */}
             <li className="nav-item">
                <a className="nav-link collapsed" href="#/" data-toggle="collapse" data-target="#poultry"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-kiwi-bird"></i>
                    <span>Poultry Farm</span>
                </a>
                <div id="poultry" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Poultry Farming Reports:</h6>
                        <a className="collapse-item" href="/birds">Flocks</a>
                        <a className="collapse-item" href="/soon">Veterinary</a>
                        
                    </div>
                </div>
            </li>
            
            

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />
           


            {/* <!-- Heading --> */}
            <div className="sidebar-heading">
                Management
            </div>
             {/* <!-- Nav Item - Utilities Collapse Menu --> */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#/" data-toggle="collapse" data-target="#empmanagement"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-user-cog"></i>
                    <span>Personel</span>
                </a>
                <div id="empmanagement" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Employee Management:</h6>
                        <a className="collapse-item" href="/emprecords">Records</a>
                        <a className="collapse-item" href="/soon">Payroll</a>  
                        <a className="collapse-item" href="/tasks">Task</a>
                        
                    </div>
                </div>
            </li>
             {/* <!-- Nav Item - Pages Collapse Menu --> */}
             <li className="nav-item">
                <a className="nav-link collapsed" href="#/" data-toggle="collapse" data-target="#health"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-stethoscope"></i>
                    <span>Animal Health</span>
                </a>
                <div id="health" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Animal Health Reports:</h6>
                        <a className="collapse-item" href="/soon">Heatlh Supplies</a>
                        <a className="collapse-item" href="/soon">Vet Report</a>
                        
                    </div>
                </div>
            </li>
            
             {/* <!-- Nav Item - Utilities Collapse Menu --> */}
             <li className="nav-item">
                <a className="nav-link collapsed" href="#/" data-toggle="collapse" data-target="#stores"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-pallet"></i>
                    <span>Supplies</span>
                </a>
                <div id="stores" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Farm Supplies:</h6>
                        <a className="collapse-item" href="/feedstock">Feed Stock</a>
                        <a className="collapse-item" href="/mixedfeed">Provender</a>  
                        <a className="collapse-item" href="/soon">Other Supplies</a>
                        
                    </div>
                </div>
            </li>
             
             {/* <!-- Nav Item - Charts --> */}
            <li className="nav-item">
                <a className="nav-link" href="/soon">
                    <i className="fas fa-fw fa-calendar"></i>
                    <span>Calendar</span></a>
            </li>
           

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />
             {/* <!-- Sidebar Toggler (Sidebar) --> */}
            {/*  <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" data-toggle="toggle" id="sidebarToggle"></button>
            </div> */}
             {/* <!-- Heading --> */}
             <div className="sidebar-heading">
              Others
            </div>
            
             {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#/" data-toggle="collapse" data-target="#formula"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-lightbulb"></i>
                    <span>Formulas</span>
                </a>
                <div id="formula" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Feed Formulation:</h6>
                        <a className="collapse-item" href="/soon">Fish</a>
                        <a className="collapse-item" href="/soon">Chicken</a>
                    </div>
                </div>
            </li>
              {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#/" data-toggle="collapse" data-target="#projection"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-calculator"></i>
                    <span>Projections</span>
                </a>
                <div id="projection" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Growth Projection Charts:</h6>
                        <a className="collapse-item" href="/soon">Fish</a>
                        <a className="collapse-item" href="/soon">Chicken</a>
                    </div>
                </div>
            </li>
           
        </ul>
         
    );

}


