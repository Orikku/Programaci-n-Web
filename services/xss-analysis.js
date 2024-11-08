"use strict";
import api from "./api.js";

export async function analyze150(fileURL) {
	const params = new URLSearchParams();
	params.append("url", fileURL);
	params.append("model", "model_150e");

	try {
		const response = await fetch(`${api.apiUrl}/xss_analysis/analyze_js?${params.toString()}`);
		const data = await response.json();
		let xError;

		if (response.ok) {
			return data;
		}
		xError = response.headers.get("x-error");

		switch (xError) {
			case "FileNotFound":
				window.alert("Archivo no encontrado");
				break;
			case "InvalidModel":
				window.alert("Modelo no encontrado");
				break;
			default:
				window.alert(data.error);
				break;
		}
	} catch (error) {
		window.alert(error);
	}
}

export async function analyze1600(fileURL) {
  
	const params = new URLSearchParams();
	params.append("url", fileURL);
	params.append("model", "model_1600e");

	try {
		const response = await fetch(`${api.apiUrl}/xss_analysis/analyze_js?${params.toString()}`);
		const data = await response.json();
		let xError;

		if (response.ok) {
			return data;
		}
		xError = response.headers.get("x-error");

		switch (xError) {
			case "FileNotFound":
				window.alert("Archivo no encontrado");
				break;
			case "InvalidModel":
				window.alert("Modelo no encontrado");
				break;
			default:
				window.alert(data.error);
				break;
		}
	} catch (error) {
		window.alert(error);
	}
}
