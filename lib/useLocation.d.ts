/**
 * @author Ankit K Kashyap
 * @description This hook captures the location data once the user grants permission
 * and then sends the Google Maps link to the provided `sendUrl`. It also returns
 * the location object.
 *
 * @param sendUrl
 *  The backend link where the data needs to be sent using a POST request.
 *  The data is sent as a JSON object: { gMap: link to Google Maps }.
 *
 * @returns The location object containing { latitude, longitude, accuracy }.
 *
 */
interface Ilocation {
    latitude: number;
    longitude: number;
    accuracy: number;
}
declare const useLocation: (sendUrl: string) => Ilocation | undefined;
export default useLocation;
