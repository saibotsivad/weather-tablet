function getRandomInteger(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
const getTemp = () => getRandomInteger(-20, 110)

export function GET() {
	const temps = [
		getTemp(),
		getTemp(),
		getTemp(),
	].sort()
	return new Response(
		JSON.stringify({
			high: temps[2],
			temperature: temps[1],
			low: temps[0],
			going: Math.random() > 0.5 ? 'up' : 'down',
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}
