import { NextRequest, NextResponse } from "next/server";
import * as tf from '@tensorflow/tfjs'

export async function POST(request: NextRequest) {
  tf.disposeVariables()

  function normalize(min: number, max: number) {
    const delta: number = max - min;
    return function (val: number) {
        return (val - min) / delta;
    };
  }

  try {

    const req = await request.json()
    const formData = [
      // 'land_area (m^2)': 40,
      // 'total_seeds (kg)': 500,
      // 'budget': 500000,	
      // 'feeding_cycle (times per day)': 2,
      // 'fish_gurame': 0,
      // 'fish_lele': 1,
      // 'fish_nila': 0,
      // 'land_type_beton': 0,
      // 'land_type_ember': 1,
      // 'land_type_terpal': 0,
      // 'food_type_maggot': 0,
      // 'food_type_pelet': 1,
      req.land_area,
      req.total_seeds,
      req.budget,
      req.feeding_cycle,
      req.fish_gurame,
      req.fish_lele,
      req.fish_nila,
      req.land_type_beton,
      req.land_type_ember,
      req.land_type_terpal,
      req.food_type_maggot,
      req.food_type_pelet
    ]


    const model = await tf.loadLayersModel(
      `${process.env.NEXT_PUBLIC_API_URL}/model/model.json`)


    const data = formData.map(normalize(Math.min(...formData), Math.max(...formData)))

    const y_pred = (model.predict(tf.tensor2d([data])) as tf.Tensor).dataSync()
    // const result = y_pred.max().dataSync()[0]
    let result = ''
    let score = 0

    if(y_pred[0] > y_pred[1] && y_pred[0] > y_pred[2]) {
      score = y_pred[0]
      result = 'high'
    }
    else if(y_pred[1] > y_pred[0] && y_pred[1] > y_pred[2]) {
      score = y_pred[1]
      result = 'low'
    }
    else {
      score = y_pred[2]
      result = 'normal'
    }


    return NextResponse.json({ success: true, message: 'success', data: {
      score: score, result: result
    }});
  } catch (error) {
    console.error('Error:', error);
      return NextResponse.json({ success: false, message: 'Internal server error' });
  }
}