"use strict";
import api from "./api.js";

class FileUploadResult {
	constructor(status, file_url, error = null) {
		this.status = status;
		this.file_url = file_url;
		this.error = error;
	}
}

class FileDeleteResult {
	constructor(status, error = null) {
		this.status = status;
		this.error = error;
	}
}

class FileGetResult {
	constructor(status, file_url, error = null) {
		this.status = status;
		this.file_url = file_url;
		this.error = error;
	}
}

export async function uploadFile(file) {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const responce = await fetch(`${api.apiUrl}/files`, {
			method: "POST",
			body: formData,
		});
		const data = await responce.json();
		let xError;

		if (responce.ok) {
			return new FileUploadResult(true, data.file_url);
		}
	} catch (error) {
		return new FileUploadResult(false, null, error);
	}
}

export async function getFile(fileUrl) {
	const params = new URLSearchParams();
	params.append("file_url", fileUrl);

	try {
		const responce = await fetch(`${api.apiUrl}/files?${params.toString()}`, {
			method: "GET",
		});
		const data = await responce.json();

		if (responce.ok) {
			return new FileGetResult(true, data.file_url);
		}
		xError = response.headers.get("x-error");
		return new FileGetResult(false, null, xError);
	} catch (error) {
		return new FileGetResult(false, null, error);
	}
}

export async function deleteFile(fileUrl) {
	console.log("delete file")
	const params = new URLSearchParams();
	params.append("file_url", fileUrl);

	try {
		const responce = await fetch(`${api.apiUrl}/files?${params.toString()}`, {
			method: "DELETE",
		});
		const data = await responce.json();

		if (responce.ok) {
			return new FileDeleteResult(true);
		}
		xError = response.headers.get("x-error");
		console.log(xError);
		return new FileDeleteResult(false, xError);
	} catch (error) {
		console.log(error);
		return new FileDeleteResult(false, error);
	}
}
