import { NextRequest, NextResponse } from "next/server";
import * as tf from '@tensorflow/tfjs'
import { storePrediction } from "@/lib/firebase/service";

export async function POST(request: NextRequest) {
  tf.disposeVariables()

  function normalize(min: number, max: number) {
    const delta: number = max - min;
    return function (val: number) {
        return (val - min) / delta;
    }
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
      
      req.food_ratio,
      req.total_seeds,
      req.budget,
      req.fish_gurame,
      req.fish_lele,
      req.fish_nila,
      req.land_type_beton,
      req.land_type_ember,
      req.land_type_terpal,
    ]

    console.log(formData)

    const dataPrice = {
      fish_gurame: 48481,
      fish_lele: 25469,
      fish_nila: 33475,
      lp1:	14699,
      lp2:	14249,
      lp3:	14069,
      hiprovite_781:	15600,
      hiprovite_781_1:	15800,
      hiprovite_781_2:	15800,
      hiprovite_782:	14400,
    }

    let days: number = 0

    if(req.fish_lele === 1) {
      days = 90
    }
    if(req.fish_gurame === 1) {
      days = 180
    }
    if(req.fish_nila === 1) {
      days = 120
    }

    const supportComponents = {
      ph: 51500 * days/90,
      amonia: 175000
    }

    const feedFormula = req.total_seeds * 0.95 * 0.03 // each day
    console.log(days)

    const estimationBudget = req.fish_gurame*dataPrice.fish_gurame*req.total_seeds
                            + req.fish_lele*dataPrice.fish_lele*req.total_seeds
                            + req.fish_nila*dataPrice.fish_nila*req.total_seeds 
                            + req.food_type_lp1*dataPrice.lp1*(req.food_ratio/100)*feedFormula*days
                            + req.food_type_lp2*dataPrice.lp2*(req.food_ratio/100)*feedFormula*days
                            + req.food_type_lp3*dataPrice.lp3*(req.food_ratio/100)*feedFormula*days
                            + req.food_type_hiprovite_781*dataPrice.hiprovite_781*(req.food_ratio/100)*feedFormula*days
                            + req.food_type_hiprovite_781_1*dataPrice.hiprovite_781_1*(req.food_ratio/100)*feedFormula*days
                            + req.food_type_hiprovite_781_2*dataPrice.hiprovite_781_2*(req.food_ratio/100)*feedFormula*days
                            + req.food_type_hiprovite_782*dataPrice.hiprovite_782*(req.food_ratio/100)*feedFormula*days
                            + supportComponents.ph + supportComponents.amonia

    console.log(feedFormula)
    console.log(estimationBudget)
    console.log(req)

    const model = await tf.loadLayersModel(
      `${process.env.NEXT_PUBLIC_API_URL}/model/model.json`)

    const data = formData.map(normalize(Math.min(...formData), Math.max(...formData)))

    console.log('normalized : ' + data)

    const y_pred = (model.predict(tf.tensor2d([data])) as tf.Tensor).dataSync()
    // const result = y_pred.max().dataSync()[0]
    let result = ''
    let score = 0

    console.log(y_pred)

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

    const res = await storePrediction({
      email: req.email,
      score: score,
      result: result,
      estimationBudget: estimationBudget,
      budget: req.budget,
      feeding_cycle: req.feeding_cycle,
      poor_water: req.poor_water,
      fish_type: req.fish_type,
      land_area: req.land_area,
      food_type: req.food_type,
      total_ponds: req.total_ponds,
      food_ratio: req.food_ratio,
    })

    return NextResponse.json({ success: true, message: 'success', data: {
      score: score, result: result
      },
      res: res,
    });
  } catch (error) {
    console.error('Error:', error);
      return NextResponse.json({ success: false, message: 'Internal server error' });
  }
}