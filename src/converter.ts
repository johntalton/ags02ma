import { I2CBufferSource } from '@johntalton/and-other-delights'
import { BitSmush } from '@johntalton/bitsmush'

export class Converter {
	static parseVersion(source: I2CBufferSource) {
		const view = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source)

		const data4 = view.getUint8(3)
		const crc8 = view.getUint8(4)

		return { data4, crc8 }
	}

	static parseTVOC(source: I2CBufferSource) {
		const view = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source)

		const status = view.getUint8(0)
		const data2 = view.getUint8(1)
		const data3 = view.getUint8(2)
		const data4 = view.getUint8(3)
		const crc8 = view.getUint8(4)

		const type = BitSmush.extractBits(status, 3, 3)
		const ready = BitSmush.extractBits(status, 0, 1) === 0

		const value = (data2 << 16) | (data3 << 8) | (data4)

		return {
			ready,
			type,
			value,
			crc8
		}
	}

	static parseResistance(source: I2CBufferSource) {
		const view = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source)

		const data1 = view.getUint8(0)
		const data2 = view.getUint8(1)
		const data3 = view.getUint8(2)
		const data4 = view.getUint8(3)
		const crc8 = view.getUint8(4)

		const value = (data1 << 24) | (data2 << 16) | (data3 << 8) | (data4)

		return {
			value,
			crc8
		}
	}
}