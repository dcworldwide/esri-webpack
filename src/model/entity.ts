export type Entity = {
  id?: number;
  text: string;
  completed: boolean;
};

export type IState = Entity[];