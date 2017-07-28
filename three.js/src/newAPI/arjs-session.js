var ARjs = ARjs || {}

/**
 * define a ARjs.Session
 * 
 * @param {Object} parameters - parameters for this session
 */
ARjs.Session = function(parameters){
	var _this = this

	this.renderer = parameters.renderer
	this.camera = parameters.camera
	this.scene = parameters.scene
	
	// log the version
	console.log('AR.js', THREEx.ArToolkitContext.REVISION, '- trackingBackend:', parameters.contextParameters.trackingBackend)

	//////////////////////////////////////////////////////////////////////////////
	//		init arSource
	//////////////////////////////////////////////////////////////////////////////
	var arSource = _this.arSource = new THREEx.ArToolkitSource(parameters.sourceParameters)

	arSource.init(function onReady(){
		arSource.onResize(arContext, _this.renderer, _this.camera)
	})
	
	// handle resize
	window.addEventListener('resize', function(){
		arSource.onResize(arContext, _this.renderer, _this.camera)
	})	
	
	//////////////////////////////////////////////////////////////////////////////
	//		init arContext
	//////////////////////////////////////////////////////////////////////////////

	// create atToolkitContext
	var arContext = _this.arContext = new THREEx.ArToolkitContext(parameters.contextParameters)
	
	// initialize it
	_this.arContext.init()
	
	arContext.addEventListener('initialized', function(event){
		arSource.onResize(arContext, _this.renderer, _this.camera)
	})
	
	//////////////////////////////////////////////////////////////////////////////
	//		update function
	//////////////////////////////////////////////////////////////////////////////
	// update artoolkit on every frame
	this.update = function(){
		if( arSource.ready === false )	return
		
		arContext.update( arSource.domElement )
	}
}

ARjs.Session.prototype.onResize = function () {
	this.arSource.onResize(this.arContext, this.renderer, this.camera)	
};
