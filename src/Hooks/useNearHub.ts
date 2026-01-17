// hooks/useNearestHub.ts
import {useEffect, useState} from 'react';

import {nearestAirport} from '../Utils/locationUtils';
// @ts-ignore
import {findNearestAirport} from 'airport-data-js';
import type {Airport} from "../Features/Flights/Types/types.ts";

export const useNearestHub = (
    airports: Airport[] | undefined,
    userLoc: { code: string, lat: number; long: number } | null,
    isSearching: boolean,
    setIsSearching: (val: boolean) => void
) => {
    const [bestHub, setBestHub] = useState<Airport | null>(null);


    useEffect(() => {
        const findHub = async () => {
            // Sécurité : on ne fait rien si les conditions ne sont pas réunies
            if (!airports || !userLoc || !isSearching) return;

            try {
                // 1. Appel lib externe
                const nearestGlobal = await findNearestAirport(userLoc.lat, userLoc.long, {
                    type: 'large_airport'
                });

                if (nearestGlobal && nearestGlobal.iata) {
                    // 2. Match avec notre DB
                    const myHub = airports.find(a => a.code === nearestGlobal.iata);

                    if (myHub) {
                        setBestHub(myHub);
                        console.log("✅ Hub validé :", myHub.name);
                    } else {
                        // 3. Fallback local
                        const fallback = nearestAirport({
                            userLat: userLoc.lat,
                            userLon: userLoc.long,
                            airports
                        });
                        setBestHub(await fallback);
                    }
                } else {
                    // Fallback si la lib ne trouve rien
                    const fallback = nearestAirport({
                        userLat: userLoc.lat,
                        userLon: userLoc.long,
                        airports
                    });
                    setBestHub(await fallback);
                }
            } catch (error) {
                console.error("Erreur recherche hub:", error);
                // Fallback en cas d'erreur réseau/lib
                const fallback = nearestAirport({
                    userLat: userLoc.lat,
                    userLon: userLoc.long,
                    airports
                });
                setBestHub(await fallback);
            } finally {
                setIsSearching(false);
            }
        };

        findHub();
    }, [airports, userLoc, isSearching, setIsSearching]);
    return bestHub;
};