export const audience = [
	{
		name: 'utm_source',
		validation: function(value, params) {
			let validationPassed = false;
			if (params.contains(value)) {
				validationPassed = true; }

			return validationPassed;
		},
	},
	{
		name: 'utm_campaign',
		validation: function(value, params) {
			let validationPassed = false;
			if (params.contains(value)) {
				validationPassed = true; }

			return validationPassed;
		}
	}
];