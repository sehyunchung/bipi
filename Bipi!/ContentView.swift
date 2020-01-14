//
//  ContentView.swift
//  Bipi!
//
//  Created by Se Hyun Chung on 2020/01/08.
//  Copyright © 2020 Sehyun Chung. All rights reserved.
//

import SwiftUI

var tapper = Tapper()

enum CustomFonts {
    static let neoDunggeunmo = "NeoDunggeunmo"
}

struct ContentView: View {
    @State var bpm = 0 as Double
    @State var dragAmount = CGSize.zero

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                ZStack {
                    Rectangle()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .foregroundColor(Color("Background"))
                    Spacer()
                    HStack(alignment: .firstTextBaseline) {
                        Text(self.bpmIntStr)
                            .font(.custom(CustomFonts.neoDunggeunmo, size: geometry.size.width * 0.40))
                            .foregroundColor(.primary)
                        Text(self.bpmDecimalStr)
                            .font(.custom(CustomFonts.neoDunggeunmo, size: geometry.size.width * 0.20))
                            .foregroundColor(.secondary)
                    }
                }.gesture(TapGesture().onEnded {
                    _ in self.tap()
                }).gesture(DragGesture().onEnded {
                    _ in self.reset()
                })
            }
            Text("Bipi!")
                .font(.custom(CustomFonts.neoDunggeunmo, size: 36))
                .bold()
                .foregroundColor(.secondary)
                .padding()
        }
    }

    var bpmStrings: [String] {
        String(bpm).components(separatedBy: ".")
    }

    var bpmIntStr: String {
        bpmStrings.first!
    }

    var bpmDecimalStr: String {
        guard bpmStrings.last != "0" else {
            return ""
        }
        return "." + bpmStrings.last!
    }

    func tap() {
        tapper.tap()
        bpm = tapper.bpm
    }

    func reset() {
        tapper.reset()
        bpm = tapper.bpm
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
