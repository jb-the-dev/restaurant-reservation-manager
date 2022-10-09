/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function readReservation(reservationId, signal) {
  return axios.get(`${API_BASE_URL}/reservations/${reservationId}`, signal);
}

export async function createReservation(newReservation, signal) {
  return axios.post(`${API_BASE_URL}/reservations`, newReservation, signal);
}

export async function updateReservation(
  reservationId,
  updatedReservation,
  signal
) {
  return axios.put(
    `${API_BASE_URL}/reservations/${reservationId}`,
    updatedReservation,
    signal
  );
}

export async function getTables(signal) {
  return axios.get(`${API_BASE_URL}/tables`, signal);
}

export async function createTable(newTable, signal) {
  return axios.post(`${API_BASE_URL}/tables`, newTable, signal);
}

export async function seatTable(tableId, config) {
  return axios.put(`${API_BASE_URL}/tables/${tableId}/seat`, config);
}

// Changes status to seated or cancelled depending on string passed in
export async function updateReservationStatus(reservationId, status) {
  const config = { data: { status } };
  return axios.put(
    `${API_BASE_URL}/reservations/${reservationId}/status`,
    config
  );
}

export async function unseatReservation(tableId) {
  return axios.delete(`${API_BASE_URL}/tables/${tableId}/seat`);
}
