export function distanceTwoPoints(pointOne, pointTwo) {
  //console.log(pointOne, pointTwo)
  const distX = pointOne[0] - pointTwo[0]
  const distY = pointOne[1] - pointTwo[1]
  const dist = Math.sqrt(distX * distX + distY * distY)

  return dist
}
