import { useAppSelector } from 'app/hooks'
import './resourcesPannel.scss'



export default function ResourcesPannel() {

    const townSelector = useAppSelector((state) => state.town)
    const resources = townSelector.resources

  return (
    <div className='resources'>
        <h2>Resources |</h2>
        {Object.entries(resources).map((resource) => 
        <p 
            className={`resources__text resources__text--${resource[0]}`} 
            key={resource[0]}>
            | {resource[0]}: {resource[1]} |
        </p>)}
    </div>
  )
}
