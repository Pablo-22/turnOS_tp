export class StringUtils {

	static compareStrings(){

	}

	static containsString(str1: string, str2: string): boolean {
		const normalizedStr1 = StringUtils.normalizeString(str1)
		const normalizedStr2 = StringUtils.normalizeString(str2)
		// Check if the first string contains the second string
		return normalizedStr1.includes(normalizedStr2);
	}

	static equals(str1: string, str2: string): boolean {
		const normalizedStr1 = StringUtils.normalizeString(str1)
		const normalizedStr2 = StringUtils.normalizeString(str2)
		// Check if the first string contains the second string
		return normalizedStr1 == normalizedStr2;
	}

	static normalizeString(str: string){
		// Remove spaces, accents, and convert to lowercase
		return str
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase()
			.replace(/\s/g, "")
	}
}
