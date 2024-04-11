interface IItems {
    id: string,
    visibility: boolean,
    isPartialHidden?: boolean
}

const caseWhenOnlyTwoPanesAreThere: IItems[] =
[
  {
    id: 'Pane0',
    visibility: true
  },
  {
    id: 'Resizer0',
    visibility: true
  },
  {
    id: 'Pane1',
    visibility: true
  }
]

// Hide any Pane -> Hide the Resizer

const caseWhenOnlyTwoPanesAreThere: IItems[] =
[
  {
    id: 'Pane0',
    visibility: true
  },
  {
    id: 'Resizer0',
    visibility: true
  },
  {
    id: 'Pane1',
    visibility: true
  }
]
