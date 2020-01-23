//
//  BpmAnimationView.swift
//  Bipi!
//
//  Created by Se Hyun Chung on 2020/01/14.
//  Copyright © 2020 Sehyun Chung. All rights reserved.
//

import Combine
import SwiftUI

struct BpmAnimationView: View {
    @Binding var interval: Double
    @State var beat: Bool = false

    var body: some View {
        let timer = Timer.publish(every: self.interval / 1000, on: .current, in: .common).autoconnect()
        return HStack {
            Text(beat ? Beat.off : Beat.on).font(.custom(CustomFonts.petMe128, size: 26))
            Spacer()
            Text(beat ? Beat.on : Beat.off).font(.custom(CustomFonts.petMe128, size: 26))
        }.frame(width: 52, height: 26, alignment: .center).onReceive(timer) { _ in self.beat.toggle() }
    }
}

struct BpmAnimation_Previews: PreviewProvider {
    static var previews: some View {
        PreviewWrapper()
    }

    struct PreviewWrapper: View {
        @State var interval: Double = Double(1000)

        var body: some View {
            BpmAnimationView(interval: $interval)
        }
    }
}
