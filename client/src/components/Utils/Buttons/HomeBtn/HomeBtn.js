import {Link} from 'react-router-dom';
import { Add, Expand } from '../../../Icons/IconsComponents';
import './homebtn.css';

const HomeBtn = ({title, color, link, svg})=>{
  if(svg === "add") svg = <Add /> 
  if(svg === "expand") svg = <Expand />
  return(
    <div className="btnHome" style={{background: `var(${color})`}}>
      <Link to={`/${link}`}>
        {svg}
        {title}
      </Link>
    </div>
  )
}

export default HomeBtn;