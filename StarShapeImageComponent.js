import React,{Component} from 'react'
class StarShapeImageComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
                    <img src={this.props.image} onclick={this.props.onclick}/>
                </div>)
    }
}
export default class StarShapeImageSourceComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {image:this.props.image,origImage:this.props.image,animated:false}
    }
    componentDidMount() {
        var imgObj= new Image()
        imgObj.src = this.state.origImage
        imgObj.onload = ()=>{
            this.drawOverStar(imgObj,this.props.color||'orange')
            this.setState({origImage:imgObj})
        }
    }
    handleClick() {
        if(!this.state.animated) {
            this.setState({animated:true})
            var scale = 0
            var deg = 0
            const interval = setInterval(()=>{
                deg+=4.5
                scale = Math.abs(Math.sin(deg*Math.PI/180))
                this.drawOverStar(this.state.origImage,this.props.color||'orange',scale)
                if(deg>180) {
                    deg = 0
                    clearInterval(interval)
                    this.setState({animated:false})
                }
            })
        }
    }
    drawOverStar(image,color,scale=0) {
        const defineShape = (context)=>{
            context.beginPath()
            for(var i=0;i<6;i++) {
                var deg = i*60
                var x = r1*Math.cos(deg*Math.PI/180),y = r1*Math.sin(deg*Math.PI/180)
                var x1 = r*Math.cos((deg+30)*Math.PI/180),y1 = r1*Math.sin((deg+30)*Math.PI/180)
                var x2 = r*Math.cos((deg+60)*Math.PI/180),y1 = r1*Math.sin((deg+60)*Math.PI/180)
                if(i == 0) {
                    context.moveTo(x,y)
                }
                else {
                    context.lineTo(x,y)
                }
                context.lineTo(x1,y1)
                context.lineTo(x2,y2)
            }
        }
        context.globalAlpha = 1
        var w = image.width
        var h = image.height
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const context = canvas.getContext('2d')
        var r = canvas.width/2
        var r1 = r/3
        context.save()
        context.translate(w/2,h/2)
        defineShape(context)
        context.clipPath()
        context.drawImage(image,-w/2,-h/2)
        context.save()
        context.restore(-w/2,0)
        context.scale(scale,1)
        context.globalAlpha = 0.5
        context.fillStyle = color
        context.fillRect(0,-h/2,w,h)
        context.restore()
        context.restore()
        this.setState({image:canvas.toDataURL()})
    }
    render() {
        return (<StarShapeImageComponent image={this.state.image} onclick={this.handleClick.bind(this)}></StarShapeImageComponent>)
    }
}
