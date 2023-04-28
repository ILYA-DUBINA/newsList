export const baseHost = 'https://hacker-news.firebaseio.com/v0/';

export type Story = {
  parent: number;
  kids: any;
  id: number,
  title: string,
  score: number,
  by: string,
  time: number,
  escendants: number,
}

export const NewsServer = async(): Promise <number[]> => { 
  try{
    const response = await fetch(`${baseHost}/beststories.json`)
    const newsData = await response.json() 
    
    return newsData; 
  } catch(e){
    throw Error(`Что то пошло не так ${e}`)
  } 
}

export const NewsServerId = async(id: number): Promise<Story> => {
  try{
    const response = await fetch(`${baseHost}/item/${id}.json`)
    const objData = await response.json()
    
    return objData;
  } catch(e){
    throw Error(`Что то пошло не так ${e}`)
  } 
}


export const NewsServerData = async(ids: number[]): Promise<Story[]> => {
  try{
    const allData = await Promise.all(ids.map(NewsServerId))

    return allData;
  } catch(e){
    throw Error(`Что то пошло не так ${e}`)
  } 
}

