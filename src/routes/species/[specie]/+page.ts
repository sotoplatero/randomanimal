import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { commonSpecies } from '$lib/iconicTaxa';

export const load: PageLoad = ({ params }) => {
    const specie = params.specie;
    const specieData = commonSpecies.find(s => s.title.toLowerCase() === specie.toLowerCase());

    if (!specieData) {
        throw error(404, {
            message: 'Species not found'
        });
    }

    return {
        specie: specieData
    };
};
