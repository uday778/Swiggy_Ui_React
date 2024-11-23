

function SearchRestaurant({
    data:{
        card:{
            card:{
                info:{
                    id,
                    cloudinaryImageId,
                    cuisines,
                    promoted=false,
                    costForTwoMessage,
                    name,
                    avgRating,
                    sla:{slaRating},
                    aggregatedDiscountInfoV2={},
                }
            }
        }
    }
}) {
    
    
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

export default SearchRestaurant

