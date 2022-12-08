import Generation from './generation_pb'

import {
  serviceImageModel,
  serviceImageWidth,
  serviceImageHeight,
  serviceImageSeed,
  serviceImageSamples,
  serviceImageSteps,
  serviceImageScaledStep,
  serviceImageCFGScale,
} from '../../config'

export const getRequest = (prompt: string) => {
  // Set up image parameters
  const imageParams = new Generation.ImageParameters()
  imageParams.setWidth(serviceImageWidth)
  imageParams.setHeight(serviceImageHeight)
  imageParams.addSeed(serviceImageSeed)
  imageParams.setSamples(serviceImageSamples)
  imageParams.setSteps(serviceImageSteps)

  // Use the `k-dpmpp-2` sampler
  const transformType = new Generation.TransformType()
  transformType.setDiffusion(Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M)
  imageParams.setTransform(transformType)

  // Use Stable Diffusion 2.0
  const request = new Generation.Request()
  request.setEngineId(serviceImageModel)
  request.setRequestedType(Generation.ArtifactType.ARTIFACT_IMAGE)
  request.setClassifier(new Generation.ClassifierParameters())

  // Use a CFG scale of `13`
  const samplerParams = new Generation.SamplerParameters()
  samplerParams.setCfgScale(serviceImageCFGScale)

  const stepParams = new Generation.StepParameter()
  const scheduleParameters = new Generation.ScheduleParameters()

  // Set the schedule to `0`, this changes when doing an initial image generation
  stepParams.setScaledStep(serviceImageScaledStep)
  stepParams.setSampler(samplerParams)
  stepParams.setSchedule(scheduleParameters)

  imageParams.addParameters(stepParams)
  request.setImage(imageParams)

  // Set our text prompt
  const promptText = new Generation.Prompt()
  promptText.setText(
    'A dream of a distant galaxy, by Caspar David Friedrich, matte painting trending on artstation HQ'
  )

  request.addPrompt(promptText)
  return {
    request,
    width: serviceImageWidth,
    height: serviceImageHeight,
    seed: serviceImageSeed,
  }
}
