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
    static let petMe128 = "PetMe128"
    static let appleIIe = "apple-iie-40"
}

enum Beat {
    static let on = "●"
    static let off = "○"
}

struct AppTitleView: View {
    @Binding var interval: Double

    var body: some View {
        HStack {
            Text("Bipi")
                .font(.custom(CustomFonts.petMe128, size: 26))
                .kerning(-8)
                .bold()
                .foregroundColor(.primary)
            Text("!")
                .font(.custom(CustomFonts.petMe128, size: 26))
                .bold()
                .foregroundColor(.primary)
                .offset(x: -14)
            Spacer()
            BpmAnimationView(interval: self.$interval)
        }.padding()
    }
}

struct FooterView: View {
    var body: some View {
        HStack {
            Spacer()
            Text("© 2020 Hard Hard Software").font(.custom(CustomFonts.petMe128, size: 14))
            Spacer()
        }.padding()
    }
}

struct ContentView: View {
    @State private var bpm = Double(0)
    @State private var interval = Double(0)

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                ZStack {
                    Rectangle()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .foregroundColor(Color("background"))

                    VStack {
                        AppTitleView(interval: self.$interval)
                        Spacer()
                        HStack(alignment: .firstTextBaseline) {
                            Text(self.bpmIntStr)
                                .font(.custom(CustomFonts.petMe128, size: geometry.size.width * 0.22))
                                .foregroundColor(.primary)
                            Text(self.bpmDecimalStr)
                                .font(.custom(CustomFonts.petMe128, size: geometry.size.width * 0.10))
                                .foregroundColor(.secondary)
                                .offset(x: -10, y: 0)
                        }
                        Spacer()
                        FooterView()
                    }
                }.gesture(TapGesture().onEnded {
                    _ in self.tap()
                }).gesture(DragGesture().onEnded {
                    _ in self.reset()
                })
            }
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
        interval = tapper.avgInterval
    }

    func reset() {
        tapper.reset()
        bpm = tapper.bpm
        interval = tapper.avgInterval
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView().previewLayout(.fixed(width: 568, height: 320)).environment(\.colorScheme, .dark)
    }
}
