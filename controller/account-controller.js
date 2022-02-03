class AccountController {

	async add(req, res){
        const params = req.params;
		const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    }
    
    async update(req, res){
        const params = req.params;
	    const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    }

    async delete(req, res){
        const params = req.params;
	    const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    }

    async query(req, res){
        const params = req.params;
	    const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    }

    async get(req, res){
        const params = req.params;
	    const body = req.body;
        console.log("params = " + JSON.stringify(params));
        console.log("body = " + JSON.stringify(body));
        return ;
    }

}

module.exports = AccountController;