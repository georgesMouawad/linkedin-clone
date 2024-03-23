import './style.css';

const InputOption = ({Icon, title}) => {
    return <div className="inputOption flex center">
        {Icon && <Icon className="inputOption-icon" />}
        <h4>{title}</h4>
    </div>
}

export default InputOption;