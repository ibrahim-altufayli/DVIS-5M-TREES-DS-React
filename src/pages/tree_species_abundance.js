import TreeAbundanceByCityChart from "../compnents/tree_abundance_by_city_chart";
import CitiesAbundanceOverAll from "../compnents/cities_abundance_overall"
import CitiesAbundancePercentageOverAll from "../compnents/cities_abundance_percentage_overall"
import CitiesTreesAbundanceHeatmap from "../compnents/cities_trees_abundance_heatmap"

export default function TreeSpeciesAbundance() {

    return (<>
            <div className="row m-3">
                <div className="col-md-12 text-center">
                    <h1> First Assignment</h1>
                </div>
            </div>
            <TreeAbundanceByCityChart width="1200" height="600"></TreeAbundanceByCityChart>
            <CitiesAbundanceOverAll width="1200" height="600"></CitiesAbundanceOverAll>
            <CitiesAbundancePercentageOverAll width="1200" height="600"></CitiesAbundancePercentageOverAll>
            <CitiesTreesAbundanceHeatmap width="1200" height="800"></CitiesTreesAbundanceHeatmap>
    </>)
}