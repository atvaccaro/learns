'''
Testing out dbc with multipage
'''

import dash
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import dash_html_components as html
import numpy as np
import pandas as pd
import plotly.graph_objs as go

clients = ['a', 'b', 'c']

navbar = dbc.NavbarSimple(
    children=[
        dcc.Location(id='url', refresh=False),
        dbc.DropdownMenu(
            nav=True,
            in_navbar=True,
            label='Menu',
            children=[dbc.DropdownMenuItem(dcc.Link(f'{client.upper()}', href=f'/{client}')) for client in clients]
        ),
    ],
    brand='Demo',
    brand_href='#',
    sticky='top',
)

body = dbc.Container(
    [
        html.Div(id='page-content')
    ]
)

app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

app.layout = html.Div([navbar, body])


def load(client):
    return np.random.rand(10), np.random.rand(10)


def multibar(args):
    return dcc.Graph(
        figure=go.Figure(
            data=[
                go.Bar(
                    x=[1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
                       2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
                    y=y,
                    name='Rest of world',
                    marker=go.bar.Marker(
                        color='rgb(55, 83, 109)'
                    )
                ) for x, y in args],
            layout=go.Layout(
                title='Stuff here',
                showlegend=True,
                legend=go.layout.Legend(
                    x=0,
                    y=1.0
                ),
                margin=go.layout.Margin(l=40, r=0, t=40, b=30)
            )
        ),
        style={'height': 300},
        id='my-graph'
    )


@app.callback(dash.dependencies.Output('page-content', 'children'),
              [dash.dependencies.Input('url', 'pathname')])
def display_page(pathname):
    x, y = load(pathname)
    return html.Div([
        html.H3('You are on page {}'.format(pathname)),
        dbc.Row([
            dbc.Col([
                dcc.Graph(
                    figure={'data': [{'x': x, 'y': y}]}
                ),
            ]),
            dbc.Col([
                multibar([load(pathname) for _ in range(3)])
            ])
        ])
    ])


if __name__ == '__main__':
    app.run_server(debug=True)
