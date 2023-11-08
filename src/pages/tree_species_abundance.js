import { CImage } from '@coreui/react'
import TreeAbundanceByCityChart from "../compnents/tree_abundance_by_city_chart";
import CitiesAbundanceOverAll from "../compnents/cities_abundance_overall"
import CitiesAbundancePercentageOverAll from "../compnents/cities_abundance_percentage_overall"
import CitiesTreesAbundanceHeatmap from "../compnents/cities_trees_abundance_heatmap"
import image from "../core/images/dataset-cover.jpeg"

export default function TreeSpeciesAbundance() {

    return (<>
        <div className="row">
            <div className="col-md-12">
                <CImage src={image} width={"100%"} height={400} />
            </div>
            <div className="col-md-12 m-2" >
                <p >
                    Welcome to our data visualization project, centered around a remarkable dataset - the 5 million trees of the United States. In this journey, we embark on a quest to unveil the untold stories hidden within this massive repository of natural treasures. Our mission is clear: to translate raw data into a compelling narrative that speaks to the heart of these urban forests.

                    This dataset is not just numbers; it's a story waiting to be told. It holds the secrets of tree populations across cities, their intricate connections, and the nuances of their distribution. With each visualization, we aim to bring this data to life, shedding light on the urban landscapes and the environment they shape.Welcome to our data visualization project, centered around a remarkable dataset - the 5 million trees of the United States. In this journey, we embark on a quest to unveil the untold stories hidden within this massive repository of natural treasures. Our mission is clear: to translate raw data into a compelling narrative that speaks to the heart of these urban forests.

                    This dataset is not just numbers; it's a story waiting to be told. It holds the secrets of tree populations across cities, their intricate connections, and the nuances of their distribution. With each visualization, we aim to bring this data to life, shedding light on the urban landscapes and the environment they shape.
                </p>
            
            </div>
            <hr></hr>
        </div>
        <TreeAbundanceByCityChart width="1200" height="600"></TreeAbundanceByCityChart>
        <CitiesAbundanceOverAll width="1200" height="600"></CitiesAbundanceOverAll>
        <CitiesAbundancePercentageOverAll width="1200" height="600"></CitiesAbundancePercentageOverAll>
        <CitiesTreesAbundanceHeatmap width="1300" height="800"></CitiesTreesAbundanceHeatmap>
    </>)
}