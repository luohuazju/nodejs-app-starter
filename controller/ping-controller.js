class PingController {
	async ping(req, res) {
		res.send("dong");
		return ;
	}
}
module.exports = PingController;