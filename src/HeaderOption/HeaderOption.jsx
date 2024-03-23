import './style.css';

const HeaderOption = ({ icon, title }) => {
    return (
        <div className="headerOption">
            {icon && <icon className="headerOption-icon" />}
            <h3 className='headerOption-title' >{title}</h3>
        </div>
    );
};

export default HeaderOption;
