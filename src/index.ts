import { I2CAddress, I2CAddressedBus } from '@johntalton/and-other-delights'
import { Common } from './common.js';

/*
Data acquisition 0x00 N.A. 5 1500
Zero-point calibration 0x01 0x00, 0x0C, 0xFF, 0xF3, 0xFC N.A. 30
Read version 0x11 N.A. 5 30
Read current resistance 0x20 N.A. 5 1500
Modify slave address 0
*/


export class AGS02MA {
	#bus

	static from(bus: I2CAddressedBus) { return new AGS02MA(bus) }

	constructor(bus: I2CAddressedBus) { this.#bus = bus }

	async getVersion() { return Common.getVersion(this.#bus) }

	async getTVOC() { return Common.getTVOC(this.#bus) }

	async getResistance() { return Common.getResistance(this.#bus) }

	async setZeroPointCalibration() { return Common.setZeroPointCalibration(this.#bus) }

	async setAddress(newAddress: I2CAddress) { return Common.setAddress(this.#bus, newAddress) }
}