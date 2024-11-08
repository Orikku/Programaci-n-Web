"use strict";
import { uploadFile, getFile, deleteFile } from "../services/files.js";
import { analyze150, analyze1600 } from "../services/xss-analysis.js";

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
	document.getElementById("result-analysis").classList.remove("d-none");
	document.getElementById("is-secure-label").textContent = data.is_secure ? "Secure" : "Insecure";
	document.getElementById("is-secure-label").classList.add(data.is_secure ? "text-bg-success" : "text-bg-danger");
	document.getElementById("confidence-label").textContent = formatPercentage(data.confidence);
	document.getElementById("model-label").textContent = data.model;
}

function formatPercentage(value) {
	return new Intl.NumberFormat("es-ES", {
		style: "percent",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

async function onFormSumbit(e, model) {
	e.preventDefault();
	startLoading();

	const form = e.target;
	const url = await uploadFile(form.inputGroupFile04.files[0]);
	const result = model == "model_1600e" ? await analyze1600(url) : await analyze150(url);
	await deleteFile(url);
	if (result) {
		onResult(result);
	}
	stopLoading();
}