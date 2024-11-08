"use strict";
import api from "./api.js";


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
			return data.file_url;
		}
	} catch (error) {
		window.alert(error);
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
			return data.file_url;
		}
		xError = response.headers.get("x-error");

		switch (xError) {
			case "FileNotFound":
				window.alert("Archivo no encontrado");
				break;
			default:
				window.alert(data.error);
				break;
		}
	} catch (error) {
		window.alert(error);
	}
}

export async function deleteFile(fileUrl) {
  const params = new URLSearchParams();
	params.append("file_url", fileUrl);

	try {
		const responce = await fetch(`${api.apiUrl}/files?${params.toString()}`, {
			method: "DELETE",
		});
		const data = await responce.json();

		if (responce.ok) {
			return data.status;
		}
		xError = response.headers.get("x-error");

		switch (xError) {
			case "FileNotFound":
				window.alert("Archivo no encontrado");
				break;
			default:
				window.alert(data.error);
				break;
		}
	} catch (error) {
		window.alert(error);
	}
}
