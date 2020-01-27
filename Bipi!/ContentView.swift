//
//  ContentView.swift
//  Bipi!
//
//  Created by Se Hyun Chung on 2020/01/08.
//  Copyright © 2020 Sehyun Chung. All rights reserved.
//

import Combine
import SwiftUI

var tapper = Tapper()

enum CustomFonts {
    static let petMe128 = "PetMe128"
}

enum Beat {
    static let on = "+"
    static let off = ""
}

final class BpmState: ObservableObject {
    @Published var interval: Double = 100_000
    @Published var intStr: String = "0"
    @Published var decimalStr: String = ""
    @Published var beat: Bool = true
}

struct AppTitleView: View {
    @EnvironmentObject var bpmState: BpmState

    var body: some View {
        HStack(alignment: .center) {
            Text("Bipi")
                .font(.custom(CustomFonts.petMe128, size: 32))
                .kerning(-8)
                .foregroundColor(.primary)
            Text("!")
                .font(.custom(CustomFonts.petMe128, size: 32))
                .foregroundColor(.primary)
                .offset(x: -14)
                .animation(nil)
                .rotationEffect(.degrees(bpmState.beat ? 0 : 10), anchor: .bottomLeading)
        }
    }
}

struct BpmAnimationView: View {
    @EnvironmentObject var bpmState: BpmState

    var body: some View {
        ZStack {
            bpmState.intStr == "0" ? nil : HStack(alignment: .center) {
                Text(bpmState.beat ? Beat.on : Beat.off).font(.custom(CustomFonts.petMe128, size: 28))
                Spacer()
                Text(bpmState.beat ? Beat.off : Beat.on).font(.custom(CustomFonts.petMe128, size: 28))
            }
        }
    }
}

struct FooterView: View {
    var body: some View {
        HStack {
            Spacer()
            Text("© 2020 Pretty Hard Software").font(.custom(CustomFonts.petMe128, size: 12))
            Spacer()
        }.padding([.bottom], 12)
    }
}

struct ContentView: View {
    @EnvironmentObject var bpmState: BpmState

    var body: some View {
        let timer = Timer.publish(every: bpmState.interval, on: .current, in: .common).autoconnect()
        return GeometryReader { geometry in
            ZStack {
                Rectangle()
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .foregroundColor(Color("background"))

                VStack {
                    ZStack(alignment: .center) {
                        BpmAnimationView()
                        AppTitleView().offset(x: 10)
                    }.padding()

                    Spacer()

                    HStack(alignment: .firstTextBaseline) {
                        Text(self.bpmState.intStr)
                            .font(.custom(CustomFonts.petMe128, size: geometry.size.width * 0.22))
                            .foregroundColor(.primary)
                        Text(self.bpmState.decimalStr)
                            .font(.custom(CustomFonts.petMe128, size: geometry.size.width * 0.10))
                            .foregroundColor(.secondary)
                            .offset(x: -10, y: 0)
                    }.offset(x: 4, y: 10)

                    Spacer()

                    FooterView()
                }
            }
            .onReceive(timer) { _ in self.bpmState.beat.toggle() }
            .gesture(TapGesture().onEnded {
                _ in self.tap()
            }).gesture(DragGesture().onEnded {
                _ in self.reset()
            })
        }.onAppear(perform: { () -> Void in () })
    }

    func getBpmString(_ bpm: Double) {
        let bpmStrings: [String] = String(bpm).components(separatedBy: ".")
        bpmState.intStr = bpmStrings.first!
        bpmState.decimalStr = bpmStrings.last != "0" ? "." + bpmStrings.last! : ""
    }

    func tap() {
        tapper.tap()
        getBpmString(tapper.bpm)
        bpmState.interval = tapper.interval
    }

    func reset() {
        tapper.reset()
        getBpmString(tapper.bpm)
        bpmState.interval = tapper.interval
        bpmState.beat = true
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            ContentView().environmentObject(BpmState()).previewLayout(.fixed(width: 568, height: 320)).environment(\.colorScheme, .dark)
            ContentView().environmentObject(BpmState()).previewLayout(.fixed(width: 320, height: 568)).environment(\.colorScheme, .dark)
        }
    }
}
