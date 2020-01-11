//
//  ContentView.swift
//  Bipi!
//
//  Created by Se Hyun Chung on 2020/01/08.
//  Copyright © 2020 Sehyun Chung. All rights reserved.
//

import SwiftUI

var t = Tapper()

struct ContentView: View {
    @State var bpm = 0 as Double

    var body: some View {
        VStack {
            Text("Bipi!").font(.largeTitle).bold().foregroundColor(.secondary)

            Spacer()

            Button(
                action: {
                    self.tap()
                }
            ) {
                Text(String(bpm)).font(.custom("IBMPlexMono-Bold", size: 100)).foregroundColor(.primary)
            }

            Spacer()

            Button(
                action: {
                    self.reset()
                }
            ) {
                Text("reset")
            }
        }
    }

    func tap() {
        t.tap()
        bpm = t.bpm
    }

    func reset() {
        t.reset()
        bpm = t.bpm
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
