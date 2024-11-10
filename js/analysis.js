"use strict";
import api from "../services/api.js";
import { uploadFile, getFile, deleteFile } from "../services/files.js";

export default function main(model) {
	initForm(model);
}

function initForm(model) {
	const form = document.getElementById("form-analysis");
	form.addEventListener("submit", async (e) => {
		await onFormSumbit(e, model);
		return;
	});
}

function startLoading() {
	const spinner = document.getElementById("spinner");
	spinner.classList.remove("d-none");
}

function stopLoading() {
	const spinner = document.getElementById("spinner");
	spinner.classList.add("d-none");
}

function onResult(data) {
	function formatPercentage(value) {
		return new Intl.NumberFormat("es-ES", {
			style: "percent",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	}
	document.getElementById("result-analysis").classList.remove("d-none");
	document.getElementById("is-secure-label").textContent = data.is_secure ? "Secure" : "Insecure";
	document.getElementById("is-secure-label").classList.add(data.is_secure ? "text-bg-success" : "text-bg-danger");
	document.getElementById("confidence-label").textContent = formatPercentage(data.confidence);
	document.getElementById("model-label").textContent = data.model;
}

async function onFormSumbit(e, model) {
	e.preventDefault();
	startLoading();

	const form = e.target;
	let result = await uploadFile(form.inputGroupFile04.files[0]);

	if (result.status) {
		let analysis = model == "model_1600e" ? await analyze1600(result.file_url) : await analyze150(result.file_url);
		if (analysis) {
			await deleteFile(result.file_url);
			onResult(analysis);
		}
		stopLoading();
		return;
	}
	if (result.file_url) {
		await deleteFile(result.file_url);
	}
	onError(result.error);
	stopLoading();
}

async function analyze150(fileURL) {
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
		onError(xError);
	} catch (error) {
		console.log(error);
	}
}

async function analyze1600(fileURL) {
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
		onError(xError);
	} catch (error) {
		console.log(error);
	}
}

function onError(xError) {
	function showErrorMsg(message) {
		const element = document.getElementById("error-modal");
		element.querySelector(".error-message").textContent = message;
		new bootstrap.Modal(element).show();
	}
	switch (xError) {
		case "FileNotFound":
			showErrorMsg(
				"El archivo no se ha encontrado. Por favor, verifica que la ruta y el nombre del archivo sean correctos."
			);
			break;
		case "InvalidModel":
			showErrorMsg("El modelo especificado no es válido. Asegúrate de seleccionar o cargar un modelo compatible.");
			break;
		case "NotJsFile":
			showErrorMsg(
				"El archivo subido no es un archivo JavaScript. Por favor, sube un archivo válido con la extensión .js."
			);
			break;
		default:
			showErrorMsg("Ha ocurrido un error inesperado: " + xError + ". Por favor, intenta nuevamente.");
			break;
	}
}
