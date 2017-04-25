class Carousel{
	constructor(options){
		let defaultOptions = {
			images:{},
			btns:{},
			time:''
		}
		this.options = Object.assign({},defaultOptions,options)
		this.checkOptions().bindEvent().autoRun()
	}
	checkOptions(){
		return this
	}
	bindEvent(){
		this.options.btns.forEach((d,i)=>{
			d.addEventListener('mouseover',(e)=>{
				this.changeBtn(e.target)
				this.changeImg(i)
				clearInterval(this.timer)
			},false)
			d.addEventListener('mouseout',(e)=>{
				this.autoRun()
			},false)
		})
		this.options.images.forEach((d)=>{
			d.addEventListener('mouseover',(e)=>{
				clearInterval(this.timer)
			},false)
			d.addEventListener('mouseout',(e)=>{
				this.autoRun()
			},false)
		})
		return this
	}
	changeBtn(tar){
		this.options.btns.forEach((d)=>{
			$(d).removeClass('banSelected')
		})
		$(tar).addClass('banSelected')
	}
	changeImg(index){
		let oSrc
		let oImges = this.options.images
		oImges.forEach((d)=>{
			$(d.childNodes[0]).removeClass('banShow')
		})
		$(oImges[index].childNodes[0]).addClass('banShow')
		if ( !oImges[index].childNodes[0].src || oImges[index].childNodes[0].src === ''){
			oSrc = oImges[index].childNodes[0].getAttribute('data-src')
			oImges[index].childNodes[0].src = oSrc
		}
	}
	autoRun(){
		this.timer = setInterval(()=>{
			let tar
			let index
			this.options.btns.forEach((d,i)=>{
				if ( $(d).hasClass('banSelected') ){
					index = i	
				} else {
					new Error('No item is selected!')
				}
			})
			index = ( index + 1 ) % this.options.images.length
			tar = this.options.btns[index]
			this.changeBtn(tar)
			this.changeImg(index)
		},this.options.time)
	}
}