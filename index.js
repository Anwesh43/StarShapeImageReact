import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import StarShapeImageSourceComponent from './StarShapeImageComponent'
class Index extends Component {
    render() {
        return (<div>
                    <StarShapeImageSourceComponent image="stp.jpg" color="#0097A7"/>
                </div>)
    }
}
ReactDOM.render(<Index/>,document.getElementById('app'))
