import { I2CAddress, I2CAddressedBus } from '@johntalton/and-other-delights'
import { REGISTER } from './defs.js'
import { Converter } from './converter.js'

const delayMs = ms => new Promise(resolve => setTimeout(resolve, ms))

export class Common {
	static async getVersion(bus: I2CAddressedBus) {
		// const ab = await bus.readI2cBlock(REGISTER.READ_VERSION, 5)

		await bus.i2cWrite(Uint8Array.from([ REGISTER.READ_VERSION ]))

		await delayMs(300)

		const ab = await bus.i2cRead(5)

		return Converter.parseVersion(ab)
	}

	static async getTVOC(bus: I2CAddressedBus) {
		const ab = await bus.readI2cBlock(REGISTER.READ_VERSION, 5)
		return Converter.parseTVOC(ab)
	}

	static async getResistance(bus: I2CAddressedBus) {
		const ab = await bus.readI2cBlock(REGISTER.READ_VERSION, 5)
		return Converter.parseResistance(ab)
	}

	static async setZeroPointCalibration(bus: I2CAddressedBus) {

	}

	static async setAddress(bus: I2CAddressedBus, newAddress: I2CAddress) {

	}
}