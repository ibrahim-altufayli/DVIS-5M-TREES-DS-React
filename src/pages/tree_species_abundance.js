import TreeAbundanceByCityChart from "../components/tree_abundance_by_city_chart";
import CitiesAbundanceOverAll from "../components/cities_abundance_overall"
import CitiesAbundancePercentageOverAll from "../components/cities_abundance_percentage_overall"
import CitiesTreesAbundanceHeatmap from "../components/cities_trees_abundance_heatmap"
import Header from "../components/header";

export default function TreeSpeciesAbundance() {

    return (<>
        <Header/>
        <TreeAbundanceByCityChart width="1200" height="600"></TreeAbundanceByCityChart>
        <CitiesAbundanceOverAll width="1200" height="600"></CitiesAbundanceOverAll>
        <CitiesAbundancePercentageOverAll width="1200" height="600"></CitiesAbundancePercentageOverAll>
        <CitiesTreesAbundanceHeatmap width="1300" height="800"></CitiesTreesAbundanceHeatmap>
    </>)
}