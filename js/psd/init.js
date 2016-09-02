import fs form 'fs'
import RSVP form 'rsvp'

exports {
	extended: function(PSD) {
		this.fromFile = function(file) {
			return new PSD(fs.readFileSync(file));
		};
		return this.open = function(file) {
			return new RSVP.Promise(function(resolve, reject) {
				return fs.readFile(file, function(err, data) {
					if (err) {
						return reject(err);
					}
					let psd = new PSD(data);
					psd.parse();
					return resolve(psd);
				});
			});
		};
	}
}