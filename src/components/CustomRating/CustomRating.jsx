import React from 'react'
import TapRating from 'react-native-ratings/dist/TapRating'

const CustomRating = ({
    size = 10,
    defaultRating = 5,
    showRating = false,
    ratingContainerStyle = {}
}) => {
    const ratingCompleted = (rating) => {
        console.log(rating)
    }
    return (
        <TapRating
            onFinishRating={ratingCompleted}
            size={size}
            defaultRating={defaultRating}
            showRating={showRating}
            ratingContainerStyle={
                {
                    alignItems: "flex-start",
                    ...ratingContainerStyle

                }
            }

        />
    )
}

export default CustomRating