module.exports = {

	add: function(req, res){
        const params = req.params;
		const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    },
    
    update: function(req, res){
        const params = req.params;
	    const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    },

    delete: function(req, res){
        const params = req.params;
	    const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    },

    query: function(req, res){
        const params = req.params;
	    const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    },

    get: function(req, res){
        const params = req.params;
	    const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    },

};